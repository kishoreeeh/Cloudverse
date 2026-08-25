import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import Button from '@/components/ui/Button';
import { noteService } from '@/services/noteService';
import { Save, Eye, Edit2, Trash2, Download, Printer } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';

export default function NotesTab({ topics = [] }) {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [noteId, setNoteId] = useState(null);
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (topics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics, selectedTopicId]);

  useEffect(() => {
    const fetchNote = async () => {
      if (!selectedTopicId) return;
      setLoading(true);
      try {
        const res = await noteService.getByTopic(selectedTopicId);
        if (res.data) {
          setContent(res.data.content || '');
          setNoteId(res.data.id || null);
        } else {
          setContent('');
          setNoteId(null);
        }
      } catch (err) {
        setContent('');
        setNoteId(null);
      } finally {
        setLoading(false);
        setIsPreview(false);
      }
    };
    fetchNote();
  }, [selectedTopicId]);

  const handleSave = async () => {
    if (!selectedTopicId || !content.trim()) {
      toast.error('Write some content before saving');
      return;
    }
    setIsSaving(true);
    try {
      const res = await noteService.save(selectedTopicId, content);
      setNoteId(res.data?.id || noteId);
      toast.success('Note saved successfully!');
    } catch (err) {
      toast.error('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!noteId) return;
    setIsDeleting(true);
    try {
      await noteService.delete(noteId);
      setContent('');
      setNoteId(null);
      toast.success('Note deleted');
    } catch (err) {
      toast.error('Failed to delete note');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportMarkdown = () => {
    if (!content.trim()) {
      toast.error('No note content to export');
      return;
    }
    const currentTopic = topics.find((t) => t.id === selectedTopicId);
    const titleSlug = currentTopic ? currentTopic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'note';
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${titleSlug}-notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded note as .md file!');
  };

  const handlePrintPDF = () => {
    if (!content.trim()) {
      toast.error('No note content to print');
      return;
    }
    const currentTopic = topics.find((t) => t.id === selectedTopicId);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to print/export note');
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentTopic?.title || 'Notes'} - CloudVerse</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            h1 { color: #0369a1; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 24px; }
            .content { font-size: 15px; white-space: pre-wrap; font-family: inherit; }
            .footer { margin-top: 40px; pt: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <h1>${currentTopic?.title || 'Topic Notes'} - CloudVerse</h1>
          <div class="content">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          <div class="footer">Exported from CloudVerse Platform</div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!topics || topics.length === 0) {
    return <EmptyState title="No topics available" description="Select a technology with topics to write notes." icon="FileText" />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[600px]">
      <div className="w-full md:w-56 flex-shrink-0 flex flex-col">
        <h3 className="font-semibold text-slate-500 mb-3 px-2 text-sm uppercase tracking-wider">Notebooks</h3>
        <ul className="space-y-1 overflow-y-auto flex-1 pr-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedTopicId === topic.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50">
          <div className="flex gap-2">
            <Button
              variant={!isPreview ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setIsPreview(false)}
            >
              <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Write
            </Button>
            <Button
              variant={isPreview ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setIsPreview(true)}
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportMarkdown}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              title="Download as .md file"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Export (.md)
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrintPDF}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Print / PDF
            </Button>
            {noteId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                loading={isDeleting}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
            <Button size="sm" onClick={handleSave} loading={isSaving}>
              <Save className="w-3.5 h-3.5 mr-1.5" /> Save
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : isPreview ? (
            <div className="absolute inset-0 overflow-y-auto p-6 prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700">
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <p className="text-slate-500 italic">Nothing to preview. Start writing in the editor.</p>
              )}
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="absolute inset-0 w-full h-full p-6 bg-transparent text-slate-800 resize-none focus:outline-hidden font-mono text-sm leading-relaxed"
              placeholder="Write your notes here in Markdown...&#10;&#10;# Heading&#10;## Subheading&#10;- Bullet point&#10;**Bold text**"
            />
          )}
        </div>
      </div>
    </div>
  );
}
