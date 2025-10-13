// frontend/src/components/widgets/MarkdownWidget.jsx
import { FileText, Edit } from 'lucide-react';

export default function MarkdownWidget({ config }) {
  const { title = 'Notes', content = '# My Notes\n\nClick the gear icon to edit this content!' } = config;
  
  console.log('📝 MarkdownWidget rendered with config:', config);
  console.log('📝 Content:', content);
  
  // Simple markdown-like rendering
  const renderContent = (text) => {
    if (!text || text.trim() === '') {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400 italic mb-2">No content yet</p>
          <p className="text-sm text-gray-500">Click the gear icon above to add notes!</p>
        </div>
      );
    }
    
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-800 mb-3 mt-4">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-bold text-gray-800 mb-2 mt-3">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-800 mb-2 mt-2">
            {line.substring(4)}
          </h3>
        );
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="text-gray-700 mb-2 leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
            )}
          </p>
        );
      }
      
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={index} className="text-gray-700 ml-6 mb-1 list-disc">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <li key={index} className="text-gray-700 ml-6 mb-1 list-decimal">
            {line.trim().replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      
      // Empty line
      if (line.trim() === '') {
        return <div key={index} className="h-3" />;
      }
      
      // Regular text
      return (
        <p key={index} className="text-gray-700 mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
  };
  
  return (
    <div className="h-full w-full bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200 p-6 shadow-sm hover:shadow-md transition-shadow overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-yellow-300">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-orange-600 bg-white px-2 py-1 rounded-full">
          <Edit className="w-3 h-3" />
          <span>Editable</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="prose prose-sm max-w-none bg-white rounded-lg p-4 min-h-[100px]">
        {renderContent(content)}
      </div>
      
      {/* Footer hint */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        💡 Tip: Use <code className="bg-yellow-100 px-1 rounded">##</code> for headings, <code className="bg-yellow-100 px-1 rounded">**text**</code> for bold
      </div>
    </div>
  );
}