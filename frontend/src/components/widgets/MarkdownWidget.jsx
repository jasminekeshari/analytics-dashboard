// frontend/src/components/widgets/MarkdownWidget.jsx
import { FileText } from 'lucide-react';
import { useMemo } from 'react';

export default function MarkdownWidget({ config }) {
  const { title = 'Notes', content = '# Welcome\n\nClick the gear icon to edit these notes!' } = config;
  
  // Parse markdown on every render
  const htmlContent = useMemo(() => {
    if (!content) return '<p class="text-gray-400 italic">No content. Click gear icon to add notes.</p>';
    
    let html = content;
    
    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-800 mb-2 mt-2">$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-800 mb-2 mt-3">$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-800 mb-3 mt-4">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
    
    // Bullet points
    html = html.replace(/^\- (.*$)/gm, '<li class="text-gray-700 ml-6 mb-1 list-disc">$1</li>');
    html = html.replace(/^\* (.*$)/gm, '<li class="text-gray-700 ml-6 mb-1 list-disc">$1</li>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '<br/><br/>');
    html = html.replace(/\n/g, '<br/>');
    
    // Wrap in paragraphs
    const lines = html.split('<br/><br/>');
    html = lines.map(line => {
      if (line.startsWith('<h') || line.startsWith('<li')) return line;
      return `<p class="text-gray-700 mb-2">${line}</p>`;
    }).join('');
    
    return html;
  }, [content]);
  
  return (
    <div className="h-full w-full bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-300 p-6 shadow-sm hover:shadow-md transition-shadow overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-400">
        <FileText className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      
      {/* Content */}
      <div 
        className="prose prose-sm max-w-none bg-white rounded-lg p-4 min-h-[120px]"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}