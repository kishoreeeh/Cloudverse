import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Play, ExternalLink, Bookmark, BookmarkCheck, Video, Tv, CheckCircle2 } from 'lucide-react';
import { topicService } from '@/services/topicService';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { cn } from '@/utils/cn';

export default function VideosTab({ topics = [], techSlug: propTechSlug }) {
  const params = useParams();
  const techSlug = propTechSlug || params.slug || 'aws';

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [activeEmbedId, setActiveEmbedId] = useState(null);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  useEffect(() => {
    if (topics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics, selectedTopicId]);

  useEffect(() => {
    const fetchTopic = async () => {
      if (!selectedTopicId) return;
      try {
        const res = await topicService.getById(selectedTopicId);
        if (res.data && res.data.videoLinks) {
          setTopicDetail(res.data);
        } else {
          setTopicDetail(null);
        }
      } catch (err) {
        setTopicDetail(null);
      }
    };
    fetchTopic();
    setActiveEmbedId(null);
  }, [selectedTopicId]);

  const activeTopicInList = topics.find(t => t.id === selectedTopicId) || topics[0];

  // Tech-specific secondary fallback embed IDs
  const getTechFallbackEmbedId = (slug) => {
    switch (slug) {
      case 'aws': return 'ulprqHHWlng';
      case 'docker': return '3c-iBn73dDE';
      case 'kubernetes': return 'PH-2FfFD2PU';
      case 'linux': return 's3jLFa5e68A';
      case 'git': return 'HVsySz-h9r4';
      case 'terraform': return 'SLB_c_ayRMo';
      default: return 'k1RI5locZE4';
    }
  };

  const primaryEmbedId = activeTopicInList?.youtubeEmbedId || getTechFallbackEmbedId(techSlug);
  const secondaryEmbedId = getTechFallbackEmbedId(techSlug);

  // Default fallback YouTube videos for each topic
  const defaultVideos = activeTopicInList ? [
    {
      title: `${activeTopicInList.title} - Complete Masterclass & Architecture Guide`,
      url: `https://www.youtube.com/watch?v=${primaryEmbedId}`,
      channel: 'DevOps & Cloud Academy',
      embedId: primaryEmbedId
    },
    {
      title: `${activeTopicInList.title} - Production Hands-On Lab & Real-World Practice`,
      url: `https://www.youtube.com/watch?v=${secondaryEmbedId}`,
      channel: 'CloudVerse Engineering',
      embedId: secondaryEmbedId
    }
  ] : [];

  // Local videos defined on topic object directly
  const localVideos = activeTopicInList?.videoLinks || [];

  // Filter out any broken/dummy example links from backend DB if present
  const validBackendVideos = (topicDetail?.videoLinks || []).filter(
    v => v.url && !v.url.includes('example1') && !v.url.includes('example2')
  );

  const videos = validBackendVideos.length > 0 
    ? validBackendVideos 
    : (localVideos.length > 0 ? localVideos : defaultVideos);

  const currentEmbedId = activeEmbedId || primaryEmbedId;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Topics Selection Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3 sticky top-20">
        <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <Video className="w-4 h-4 text-emerald-600" />
            <span>Video Topics</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {topics.length} Available
          </span>
        </div>

        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {topics.map((topic, idx) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setActiveEmbedId(null);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left truncate",
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm font-extrabold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <span className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                )}>
                  {idx + 1}
                </span>
                <span className="truncate">{topic.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Video Content Area */}
      <div className="flex-1 w-full space-y-6">
        {activeTopicInList && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTopicId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Header Info */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Video Tutorial
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{techSlug.toUpperCase()} Module</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeTopicInList.title}
                </h2>
                <p className="text-slate-600 text-sm">
                  {activeTopicInList.summary}
                </p>
              </div>

              {/* Embedded Interactive YouTube Video Player */}
              <Card className="p-4 sm:p-6 bg-slate-900 text-white border-slate-800 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Tv className="w-5 h-5 text-red-500" />
                    <span className="font-extrabold text-sm sm:text-base text-slate-100 truncate">
                      Watch: {activeTopicInList.title}
                    </span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${currentEmbedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all shadow-xs shrink-0"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                  <iframe
                    key={currentEmbedId}
                    src={`https://www.youtube.com/embed/${currentEmbedId}?autoplay=1&rel=0`}
                    title={activeTopicInList.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Card>

              {/* Video Resources List & Bookmarking */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Tutorial Links ({videos.length})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((video, idx) => {
                    const videoId = extractYouTubeId(video.url) || currentEmbedId;
                    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    const bookmarkId = `v-${selectedTopicId}-${idx}`;
                    const bookmarked = isBookmarked(bookmarkId);
                    const isPlayingInPlayer = videoId === currentEmbedId;

                    return (
                      <Card key={idx} hoverable padding="none" className={cn(
                        "overflow-hidden bg-white border-slate-200/90 shadow-2xs flex flex-col justify-between group transition-all",
                        isPlayingInPlayer && "ring-2 ring-emerald-500 border-emerald-500"
                      )}>
                        <button
                          type="button"
                          onClick={() => setActiveEmbedId(videoId)}
                          className="block relative aspect-video bg-slate-100 overflow-hidden w-full text-left"
                        >
                          <img
                            src={thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className={cn(
                            "absolute inset-0 bg-slate-900/50 transition-opacity flex items-center justify-center gap-2",
                            isPlayingInPlayer ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}>
                            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                              <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                            {isPlayingInPlayer && (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                                Now Playing
                              </span>
                            )}
                          </div>
                        </button>

                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <button
                            type="button"
                            onClick={() => setActiveEmbedId(videoId)}
                            className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors line-clamp-2 text-left"
                          >
                            {video.title}
                          </button>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                            <span>{video.channel || 'CloudVerse Academy'}</span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark({
                                    id: bookmarkId,
                                    techSlug,
                                    type: 'video',
                                    title: video.title,
                                    subtitle: `Topic: ${activeTopicInList.title}`,
                                    link: video.url
                                  });
                                }}
                                className={cn(
                                  "p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all",
                                  bookmarked
                                    ? "bg-amber-100 border-amber-300 text-amber-900"
                                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                                )}
                                title={bookmarked ? "Remove Bookmark" : "Save Video"}
                              >
                                {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                              </button>

                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
                                title="Open in YouTube"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
