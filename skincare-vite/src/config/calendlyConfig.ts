// Calendly Configuration for MTM Services
// Replace these URLs with your actual Calendly event URLs

export interface CalendlyServiceMapping {
  serviceId: string;
  calendlyUrl: string;
  serviceName: string;
  duration: string;
}

export const calendlyServiceMappings: CalendlyServiceMapping[] = [
  {
    serviceId: '1', // Health & Scalp Therapy
    calendlyUrl: 'https://calendly.com/kumarann-umich/mind-scalp-therapy',
    serviceName: 'Health & Scalp Health and Relaxation',
    duration: '40 min'
  },
  {
    serviceId: '2', // Hair Growth Therapy
    calendlyUrl: 'https://calendly.com/kumarann-umich/hair-growth-preservation-therapy-clone',
    serviceName: 'Hair Growth & Preservation Therapy',
    duration: '60 min'
  },
  {
    serviceId: '3', // Hair Rejuvenation Therapy
    calendlyUrl: 'https://calendly.com/kumarann-umich/mind-scalp-therapy-clone',
    serviceName: 'Hair Rejuvenation Therapy',
    duration: '60 min'
  },
  {
    serviceId: '4', // Gong Therapy Add-on
    calendlyUrl: 'https://calendly.com/kumarann-umich/mind-scalp-therapy',
    serviceName: 'Acoustic & Tibetan Bowl Vibration Therapy',
    duration: '15 min'
  },
  {
    serviceId: '5', // Hair Styling Add-on
    calendlyUrl: 'https://calendly.com/kumarann-umich/mind-scalp-therapy',
    serviceName: 'Hair Styling',
    duration: '20 min'
  }
];

// Helper function to get Calendly URL by service ID
export const getCalendlyUrlByServiceId = (serviceId: string): string => {
  const mapping = calendlyServiceMappings.find(m => m.serviceId === serviceId);
  return mapping?.calendlyUrl || '';
};

// Helper function to get service mapping by service ID
export const getServiceMappingByServiceId = (serviceId: string): CalendlyServiceMapping | undefined => {
  return calendlyServiceMappings.find(m => m.serviceId === serviceId);
}; 