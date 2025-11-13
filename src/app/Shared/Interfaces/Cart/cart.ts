import { Category } from "../Category/category"
import { Brand } from "../Product/brand"
import { SubCategory } from "../Product/sub-category"

export interface Cart {
  _id: string
  cartOwner: string
  products: CartItem[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartItem {
  count: number
  _id: string
  product: CartProductDetails
  price: number
}

export interface CartProductDetails {
  subcategory: SubCategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}




