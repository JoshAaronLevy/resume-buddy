import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function ActionsSidebar() {
  return (
    <Card>
      <div className="flex flex-column gap-3">
        <h3 className="mt-0 mb-2">Actions</h3>
        
        <Button 
          label="Analyze Resume" 
          icon="pi pi-search"
          disabled
          tooltip="Upload a resume and select sections (Milestone 1)"
        />
        
        <Button 
          label="View Analysis" 
          icon="pi pi-eye" 
          severity="info"
          disabled
          tooltip="No analysis available yet"
        />
        
        <Button 
          label="Save Analysis" 
          icon="pi pi-save" 
          severity="success"
          disabled
          tooltip="Complete an analysis first"
        />

        <Card className="mt-3">
          <p className="text-sm text-color-secondary m-0">No analysis yet</p>
        </Card>
      </div>
    </Card>
  );
}
