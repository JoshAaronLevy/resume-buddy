export default function Header() {
  return (
    <header 
      className="flex align-items-center justify-content-between p-3 shadow-2" 
      style={{ backgroundColor: '#ffffff' }}
      role="banner"
    >
      <div className="flex align-items-center gap-2">
        <i className="pi pi-file-edit text-3xl text-blue-500"></i>
        <div>
          <h1 className="text-2xl font-bold m-0">Resume Buddy</h1>
          <span className="text-sm text-color-secondary">AI-Powered Resume Feedback</span>
        </div>
      </div>
      <div className="flex align-items-center gap-2">
        <span className="text-xs text-color-secondary hidden md:inline">MVP v0.1.0</span>
      </div>
    </header>
  );
}
