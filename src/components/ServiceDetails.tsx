import React, { useEffect } from 'react';
import LuxuryToursPage from './divisions/LuxuryToursPage';
import GroupTripsPage from './divisions/GroupTripsPage';
import AdventureToursPage from './divisions/AdventureToursPage';
import LuxuryHoneymoonsPage from './divisions/LuxuryHoneymoonsPage';
import MiceEventsPage from './divisions/MiceEventsPage';
import CustomJourneysPage from './divisions/CustomJourneysPage';
import AiTravelPage from './divisions/AiTravelPage';

interface ServiceDetailsProps {
  key?: string;
  isOpen: boolean;
  onClose: () => void;
  divisionId: string | null;
  onBookNow: (divisionId: string) => void;
}

export default function ServiceDetails({ 
  isOpen, 
  onClose, 
  divisionId, 
  onBookNow 
}: ServiceDetailsProps) {
  
  useEffect(() => {
    if (isOpen) {
      if ((window as any).lenis) { (window as any).lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); };
    }
  }, [isOpen, divisionId]);

  if (!isOpen) return null;


  return (
    <>
      {divisionId === 'luxury-tours' && (
        <LuxuryToursPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('luxury-tours')} 
        />
      )}
      {divisionId === 'group-trips' && (
        <GroupTripsPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('group-trips')} 
        />
      )}
      {divisionId === 'adventure-tours' && (
        <AdventureToursPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('adventure-tours')} 
        />
      )}
      {divisionId === 'luxury-honeymoons' && (
        <LuxuryHoneymoonsPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('luxury-honeymoons')} 
        />
      )}
      {divisionId === 'mice-events' && (
        <MiceEventsPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('mice-events')} 
        />
      )}
      {divisionId === 'custom-journeys' && (
        <CustomJourneysPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('custom-journeys')} 
        />
      )}
      {divisionId === 'ai-travel' && (
        <AiTravelPage 
          onClose={onClose} 
          onBookNow={() => onBookNow('ai-travel')} 
        />
      )}
    </>
  );
}
