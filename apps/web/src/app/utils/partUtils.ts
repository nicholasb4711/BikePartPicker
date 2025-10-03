export interface BuildComponent {
    id: string;
    name: string;
    category: string;
    price: number;
    brand: string;
    compatibility: string[];
    image?: string;
}

export interface BuildStep {
    id: string;
    name: string;
    description: string;
    required: boolean;
    completed: boolean;
}
export const buildSteps: BuildStep[] = [
    { id: "frame", name: "Frame", description: "Choose your bike frame", required: true, completed: false },
    { id: "groupset", name: "Groupset", description: "Select drivetrain components", required: true, completed: false },
    { id: "wheels", name: "Wheels", description: "Pick your wheelset", required: true, completed: false },
    { id: "cockpit", name: "Cockpit", description: "Handlebars, stem, and seatpost", required: true, completed: false },
    { id: "accessories", name: "Accessories", description: "Pedals, saddle, and extras", required: false, completed: false },
];

export const sampleComponents: Record<string, BuildComponent[]> = {
    frame: [
        { id: "frame-1", name: "Specialized Tarmac SL8", category: "frame", price: 3200, brand: "Specialized", compatibility: ["shimano", "sram"] },
        { id: "frame-2", name: "Trek Émonda SLR", category: "frame", price: 2800, brand: "Trek", compatibility: ["shimano", "sram"] },
        { id: "frame-3", name: "Canyon Ultimate CF SLX", category: "frame", price: 2400, brand: "Canyon", compatibility: ["shimano", "sram"] },
    ],
    groupset: [
        { id: "groupset-1", name: "Shimano Dura-Ace Di2", category: "groupset", price: 2800, brand: "Shimano", compatibility: ["shimano"] },
        { id: "groupset-2", name: "SRAM Red eTap AXS", category: "groupset", price: 2600, brand: "SRAM", compatibility: ["sram"] },
        { id: "groupset-3", name: "Shimano Ultegra Di2", category: "groupset", price: 1800, brand: "Shimano", compatibility: ["shimano"] },
    ],
    wheels: [
        { id: "wheels-1", name: "Zipp 404 Firecrest", category: "wheels", price: 1600, brand: "Zipp", compatibility: ["shimano", "sram"] },
        { id: "wheels-2", name: "ENVE SES 4.5", category: "wheels", price: 2200, brand: "ENVE", compatibility: ["shimano", "sram"] },
        { id: "wheels-3", name: "DT Swiss ARC 1100", category: "wheels", price: 1400, brand: "DT Swiss", compatibility: ["shimano", "sram"] },
    ],
    cockpit: [
        { id: "cockpit-1", name: "Zipp Service Course SL", category: "cockpit", price: 450, brand: "Zipp", compatibility: ["shimano", "sram"] },
        { id: "cockpit-2", name: "ENVE Aero Road Bar", category: "cockpit", price: 380, brand: "ENVE", compatibility: ["shimano", "sram"] },
        { id: "cockpit-3", name: "Fizik Cyrano R1", category: "cockpit", price: 320, brand: "Fizik", compatibility: ["shimano", "sram"] },
    ],
    accessories: [
        { id: "accessories-1", name: "Shimano Dura-Ace Pedals", category: "accessories", price: 280, brand: "Shimano", compatibility: ["shimano", "sram"] },
        { id: "accessories-2", name: "Fizik Antares R1 Saddle", category: "accessories", price: 220, brand: "Fizik", compatibility: ["shimano", "sram"] },
        { id: "accessories-3", name: "Continental GP5000 Tires", category: "accessories", price: 120, brand: "Continental", compatibility: ["shimano", "sram"] },
    ],
};