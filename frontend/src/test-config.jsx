import { useState } from 'react';
import WidgetConfigPanel from './components/dashboard/WidgetConfigPanel';
import useDashboardStore from './store/dashboardStore';

export default function TestConfig() {
  const [show, setShow] = useState(false);
  
  return (
    <div className="p-8">
      <button 
        onClick={() => {
          // Manually set a selected widget
          useDashboardStore.setState({ 
            selectedWidget: 'test-widget',
            currentDashboard: {
              id: 'test',
              name: 'Test',
              layout: [{
                i: 'test-widget',
                x: 0, y: 0, w: 4, h: 4,
                widgetType: 'notes.markdown',
                config: { title: 'Test Notes', content: '# Test' }
              }]
            }
          });
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Modal
      </button>
      
      <WidgetConfigPanel />
    </div>
  );
}