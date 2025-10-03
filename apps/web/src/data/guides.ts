// Guide data structure for CMS integration
export interface GuideSection {
  id: string;
  type: 'warning' | 'info' | 'success' | 'content' | 'table' | 'grid';
  title?: string;
  content?: string;
  items?: string[];
  tableData?: {
    headers: string[];
    rows: Record<string, string>[];
  };
  gridItems?: {
    title: string;
    content: string;
    badge?: string;
    badgeColor?: string;
  }[];
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: GuideSection[];
  nextSteps?: {
    title: string;
    description: string;
    href: string;
  }[];
}

// Guide data - this could come from a CMS later
export const guides: Guide[] = [
  {
    id: 'drivetrain',
    title: 'Drivetrain Compatibility',
    description: 'The most important compatibility rule: Shimano and SRAM don\'t mix. Here\'s what you need to know.',
    category: 'Essential',
    sections: [
      {
        id: 'critical-warning',
        type: 'warning',
        title: '🚨 Critical Rule: Don\'t Mix Shimano and SRAM',
        content: 'Shimano and SRAM shifters and derailleurs are NOT compatible due to different cable pull ratios.',
        items: [
          'Chains (work with both brands)',
          'Cranksets (with proper bottom bracket)',
          'Brake components'
        ]
      },
      {
        id: 'compatibility-table',
        type: 'table',
        title: 'What Works Together',
        tableData: {
          headers: ['Component', 'Shimano Build', 'SRAM Build', 'Can Mix?'],
          rows: [
            { component: 'Shifters', shimano: 'Shimano', sram: 'SRAM', canmix: '❌ No' },
            { component: 'Derailleur', shimano: 'Shimano', sram: 'SRAM', canmix: '❌ No' },
            { component: 'Chain', shimano: 'Any 11/12-speed', sram: 'Any 11/12-speed', canmix: '✅ Yes' },
            { component: 'Cassette', shimano: 'Shimano', sram: 'SRAM', canmix: '❌ No' },
            { component: 'Crankset', shimano: 'Any brand', sram: 'Any brand', canmix: '✅ Yes' }
          ]
        }
      },
      {
        id: 'speed-compatibility',
        type: 'grid',
        title: 'Speed Compatibility',
        gridItems: [
          {
            title: '10-Speed',
            content: 'Older standard. Not compatible with 11/12-speed. Still found on entry bikes.',
            badge: 'Legacy'
          },
          {
            title: '11-Speed', 
            content: 'Most common current standard. Chain works with 12-speed. Good upgrade path.',
            badge: 'Standard'
          },
          {
            title: '12-Speed',
            content: 'Latest standard. Requires specific hub (Micro Spline/XDR). Best performance.',
            badge: 'Modern'
          }
        ]
      },
      {
        id: 'common-mistakes',
        type: 'warning',
        title: 'Common Mistakes',
        items: [
          'Mixing shifter and derailleur brands - Always match your shifter and derailleur brands',
          'Wrong speed chain - 10-speed chains don\'t work with 11/12-speed cassettes'
        ]
      }
    ],
    nextSteps: [
      { title: 'Wheel Compatibility →', description: 'Learn about hub and axle standards', href: '/guides/wheels' },
      { title: 'Start Building →', description: 'Use our compatibility checker', href: '/builder' }
    ]
  },
  {
    id: 'wheels',
    title: 'Wheel & Hub Compatibility',
    description: 'Understanding axle standards and brake types. Get these basics right to avoid compatibility issues.',
    category: 'Essential',
    sections: [
      {
        id: 'key-points',
        type: 'info',
        title: '🎯 Key Compatibility Points',
        gridItems: [
          { title: 'Frame Dropouts', content: 'Must match wheel axle standard exactly' },
          { title: 'Brake Type', content: 'Frame, fork, and wheels must all match' }
        ]
      },
      {
        id: 'axle-standards',
        type: 'content',
        title: 'Axle Standards',
        gridItems: [
          {
            title: 'Quick Release (QR)',
            content: 'Traditional skewer system, still common on entry-level bikes. Front: 9mm, Rear: 10mm',
            badge: 'Legacy',
            badgeColor: 'gray'
          },
          {
            title: 'Thru-Axle 12mm',
            content: 'Current standard for road disc bikes, increased stiffness. Front: 12x100mm, Rear: 12x142mm',
            badge: 'Modern Standard',
            badgeColor: 'green'
          }
        ]
      },
      {
        id: 'brake-types',
        type: 'grid',
        title: 'Brake Type Compatibility',
        gridItems: [
          {
            title: 'Rim Brakes',
            content: 'Brake pads clamp on wheel rim. ✅ Lightweight, Simple maintenance ❌ Poor wet performance, Rim wear'
          },
          {
            title: 'Disc Brakes', 
            content: 'Brake pads clamp on rotor attached to hub. ✅ Consistent performance, No rim wear ❌ Heavier, More complex'
          }
        ]
      },
      {
        id: 'hub-standards',
        type: 'content',
        title: 'Hub Standards',
        content: 'Must match your drivetrain brand and speed',
        items: [
          'Shimano HG - Shimano 8-11 speed',
          'Shimano Micro Spline - Shimano 12 speed',
          'SRAM XDR - SRAM 12 speed road'
        ]
      },
      {
        id: 'common-mistakes',
        type: 'warning',
        title: 'Common Mistakes',
        items: [
          'Wrong axle standard - Buying 12mm thru-axle wheels for QR frame dropouts',
          'Brake type mismatch - Disc brake wheels on rim brake frame'
        ]
      }
    ],
    nextSteps: [
      { title: 'Frame Standards →', description: 'Bottom bracket and headset compatibility', href: '/guides/frame-standards' },
      { title: 'Start Building →', description: 'Apply your knowledge', href: '/builder' }
    ]
  },
  {
    id: 'frame-standards',
    title: 'Frame Standards',
    description: 'Frame standards are fixed and cannot be changed. Always verify these measurements before buying components.',
    category: 'Essential',
    sections: [
      {
        id: 'frame-fixed-warning',
        type: 'warning',
        title: '🎯 Frame Standards Are Fixed',
        content: 'Unlike other components, frame standards cannot be changed after manufacturing. Always verify these before purchasing.',
        gridItems: [
          { title: 'Bottom Bracket', content: 'Determines which cranksets fit' },
          { title: 'Headset', content: 'Determines fork compatibility' },
          { title: 'Seatpost', content: 'Exact diameter required' }
        ]
      },
      {
        id: 'bottom-bracket',
        type: 'content',
        title: 'Bottom Bracket Standards',
        content: 'The most common frame standards you\'ll encounter',
        gridItems: [
          {
            title: 'BSA (English Threaded)',
            content: 'Threading: 1.37" x 24 TPI, Shell: 68-70mm, Most reliable and easy to service'
          },
          {
            title: 'BB86/BB92 (Press-Fit)',
            content: 'Press-fit bearings, Shell: 86.5-92mm, Common on modern road bikes'
          },
          {
            title: 'PF30 (Press-Fit 30)',
            content: 'Press-fit bearings, Shell: 68mm, Can develop creaks over time'
          }
        ]
      },
      {
        id: 'headset-standards',
        type: 'content',
        title: 'Headset Standards',
        content: 'Fork and stem compatibility',
        gridItems: [
          {
            title: '1⅛" Threadless',
            content: 'Most common road bike standard. Steerer: 1⅛" (28.6mm), Stem clamp: Must be 1⅛"',
            badge: 'Standard',
            badgeColor: 'green'
          },
          {
            title: 'Tapered (1⅛" to 1.5")',
            content: 'Larger lower bearing for increased stiffness. Still uses 1⅛" stems',
            badge: 'Modern',
            badgeColor: 'blue'
          }
        ]
      },
      {
        id: 'seatpost',
        type: 'content',
        title: 'Seatpost Diameter',
        items: [
          '27.2mm - Steel/titanium frames',
          '31.6mm - Modern road/gravel frames'
        ]
      },
      {
        id: 'seatpost-warning',
        type: 'warning',
        title: '⚠️ Critical Measurement',
        content: 'Seatpost diameter must match seat tube inner diameter exactly. Even 0.2mm difference can prevent installation.'
      },
      {
        id: 'common-mistakes',
        type: 'warning',
        title: 'Common Mistakes',
        items: [
          'Wrong seatpost diameter - Buying 31.6mm seatpost for 27.2mm seat tube',
          'Incompatible crankset - 30mm spindle crankset in BB86 frame without adapter'
        ]
      }
    ],
    nextSteps: [
      { title: 'Drivetrain Guide →', description: 'Shimano vs SRAM compatibility', href: '/guides/drivetrain' },
      { title: 'Start Building →', description: 'Apply your frame knowledge', href: '/builder' }
    ]
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(guide => guide.id === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}
