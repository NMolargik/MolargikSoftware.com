/**
 * Color metadata display component
 */

import { Calendar, Smartphone, User } from 'lucide-react';
import type { OpaliteColor } from '../../types/opalite';
import { formatDate } from '../../services/colorUtils';

interface ColorMetadataProps {
  color: OpaliteColor;
}

interface MetadataRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | undefined;
}

function MetadataRow({ icon, label, value }: MetadataRowProps) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0">
      <div className="text-white/40 mt-0.5">{icon}</div>
      <div className="flex-1">
        <span className="text-white/50 text-sm block">{label}</span>
        <span className="text-white text-sm">{value}</span>
      </div>
    </div>
  );
}

export default function ColorMetadata({ color }: ColorMetadataProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <h3 className="text-lg font-semibold text-white mb-3">Details</h3>
      <div>
        <MetadataRow
          icon={<User className="w-4 h-4" />}
          label="Created by"
          value={color.createdByDisplayName}
        />
        <MetadataRow
          icon={<Calendar className="w-4 h-4" />}
          label="Created"
          value={formatDate(color.createdAt)}
        />
        <MetadataRow
          icon={<Smartphone className="w-4 h-4" />}
          label="Created on"
          value={color.createdOnDeviceName}
        />
        <MetadataRow
          icon={<Calendar className="w-4 h-4" />}
          label="Updated"
          value={formatDate(color.updatedAt)}
        />
        <MetadataRow
          icon={<Smartphone className="w-4 h-4" />}
          label="Updated on"
          value={color.updatedOnDeviceName}
        />
      </div>
    </div>
  );
}
