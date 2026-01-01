import React from 'react';
import Header from './components/Header';
import RatioTool from './components/RatioTool';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6 pb-12 px-4">
      <div className="w-full max-w-[460px] mx-auto flex flex-col items-center">
        <Header />
        <RatioTool />
      </div>
    </div>
  );
};

export default App;