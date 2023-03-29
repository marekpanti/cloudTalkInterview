import { Shipment, ShipmentStatus } from './warehouse.model';

export const MockedShipments: Shipment[] = [
  {
    companyName: 'Adidas',
    id: 1,
    createdAt: new Date(),
    scheduledTo: new Date(),
    items: [1, 1, 2],
    totalPrice: 2,
    lastUpdate: new Date(),
    status: ShipmentStatus.CREATED,
  },
];
