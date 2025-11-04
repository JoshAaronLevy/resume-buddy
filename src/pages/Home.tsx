import UploadPanel from '../components/UploadPanel';
import ActionsSidebar from '../components/ActionsSidebar';

export default function Home() {
  return (
    <div className="grid">
      <div className="col-12 md:col-8">
        <UploadPanel />
      </div>
      <div className="col-12 md:col-4">
        <ActionsSidebar />
      </div>
    </div>
  );
}
