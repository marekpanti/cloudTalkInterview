export interface WarehouseItem {
    imageUrl: string
    id: number
    name: string
    description: string
    quantity: number
    unitPrice: number
}

export interface ItemInShipment extends WarehouseItem {
  tempId: string;
}

export interface Shipment {
  companyName: string
  id: number
  createdAt: Date
  scheduledTo: Date
  items: number[]
  unitPrice: number
  lastUpdate: Date
  status: ShipmentStatus
}

export enum ShipmentStatus {
  PREPARED = "Prepared",
  CREATED = "Created",
  SHIPPED = "Shipped"
}
