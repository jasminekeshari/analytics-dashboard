// frontend/src/components/widgets/MarkdownWidget.jsx
import { FileText } from 'lucide-react';

export default function MarkdownWidget({ config }) {
  const { title = 'Notes', content = '# Notes\n\nAdd your notes here...' } = config;
  
  const renderContent = (text) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-gray-800 mb-3">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-gray-800 mb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-gray-800 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="text-gray-700 ml-4 mb-1">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      return <p key={index} className="text-gray-700 mb-2">{line}</p>;
    });
  };
  
  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow overflow-auto">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="prose prose-sm max-w-none">
        {renderContent(content)}
      </div>
    </div>
  );
}