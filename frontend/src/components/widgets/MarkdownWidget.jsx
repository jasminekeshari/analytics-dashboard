// frontend/src/components/widgets/MarkdownWidget.jsx
import { FileText } from 'lucide-react';
import { useEffect } from 'react';

export default function MarkdownWidget({ config }) {
  const title = config?.title || 'Notes';
  const content = config?.content || 'Click gear icon to add notes';
  
  useEffect(() => {
    console.log('🎨 MarkdownWidget rendered');
    console.log('🎨 Title:', title);
    console.log('🎨 Content:', content);
  }, [title, content]);
  
  return (
    <div className="h-full w-full bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg border-4 border-yellow-400 p-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-yellow-500">
        <FileText className="w-6 h-6 text-orange-600" />
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      </div>
      
      {/* Content - ULTRA SIMPLE */}
      <div className="bg-white rounded-lg p-4 min-h-[100px] shadow-inner">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
          {content}
        </pre>
      </div>
      
      {/* Debug Info */}
      <div className="mt-2 text-xs text-gray-600">
        Content length: {content?.length || 0} chars
      </div>
    </div>
  );
}