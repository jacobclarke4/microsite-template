import { useState, ReactNode } from 'react';
import clsx from 'clsx';
import { Rounded, roundedMap } from '../types';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  bgColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  contentBgColor?: string;
  rounded?: Rounded;
  variant?: 'underline' | 'pills' | 'boxed';
  fullWidth?: boolean;
  onChange?: (tabId: string) => void;
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    id: 'tab1',
    label: 'Overview',
    content: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Overview Content</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
      </div>
    ),
  },
  {
    id: 'tab2',
    label: 'Features',
    content: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Features Content</h3>
        <p className="text-gray-600">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
    ),
  },
  {
    id: 'tab3',
    label: 'Pricing',
    content: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Pricing Content</h3>
        <p className="text-gray-600">
          Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium.
        </p>
      </div>
    ),
  },
];

export function Tabs({
  tabs = defaultTabs,
  defaultTab,
  bgColor = 'bg-gray-100',
  activeColor = 'bg-white text-blue-600',
  inactiveColor = 'text-gray-600 hover:text-gray-900',
  contentBgColor = 'bg-white',
  rounded = 'lg',
  variant = 'underline',
  fullWidth = false,
  onChange,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const renderTabList = () => {
    if (variant === 'pills') {
      return (
        <div className={clsx('inline-flex p-1', roundedMap[rounded], bgColor)}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all',
                roundedMap[rounded],
                activeTab === tab.id ? activeColor : inactiveColor,
                activeTab === tab.id && 'shadow-sm'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      );
    }

    if (variant === 'boxed') {
      return (
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 -mb-px',
                fullWidth && 'flex-1 justify-center',
                activeTab === tab.id
                  ? 'border-[var(--primary)] text-[var(--primary)] bg-white]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      );
    }

    // Underline variant (default)
    return (
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px',
              fullWidth && 'flex-1 justify-center',
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {renderTabList()}
      <div className={clsx('mt-4', contentBgColor, roundedMap[rounded])}>
        {activeContent}
      </div>
    </div>
  );
}

// Simple vertical tabs
interface VerticalTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function VerticalTabs({
  tabs = defaultTabs,
  defaultTab,
  className,
}: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={clsx('flex gap-6', className)}>
      <div className="w-48 flex-shrink-0">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-left transition-colors',
                activeTab === tab.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 bg-white rounded-lg border border-gray-200">
        {activeContent}
      </div>
    </div>
  );
}
