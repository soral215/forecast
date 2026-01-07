import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '../pages/home'
import { PlaceDetailPage } from '../pages/place-detail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/place',
    element: <PlaceDetailPage />,
  },
])


