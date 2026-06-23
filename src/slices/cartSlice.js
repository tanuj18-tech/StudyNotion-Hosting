import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],

  total: localStorage.getItem("total")
    ? Number(JSON.parse(localStorage.getItem("total"))) || 0
    : 0,

  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const course = action.payload

      console.log("FULL COURSE OBJECT:", course)
      console.log("course.price =", course.price)

      const index = state.cart.findIndex(
        (item) => item._id === course._id
      )

      if (index >= 0) {
        toast.error("Course already in cart")
        return
      }

      // add course
      state.cart.push(course)
      state.totalItems++

      // safe total update
      state.total = Number(state.total) || 0
      state.total += Number(course.price) || 0

      // save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

      toast.success("Course added to cart")
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload

      const index = state.cart.findIndex(
        (item) => item._id === courseId
      )

      if (index >= 0) {
        state.totalItems--

        // safe subtraction
        state.total = Number(state.total) || 0
        state.total -= Number(state.cart[index].price) || 0

        state.cart.splice(index, 1)

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

        toast.success("Course removed from cart")
      }
    },

    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0

      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer