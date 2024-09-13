import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { EditUser } from "./utils/edit-user"
import { AddUser } from "./utils/add-user"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "",
    element: <App />
  },
  {
    path:'edit/:id',
    element: <EditUser />
  },
  {
    path: 'add',
    element: <AddUser/>
  }
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}> 

        </RouterProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
