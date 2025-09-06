import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from './providers/theme.provider'

export const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster richColors />
    </QueryClientProvider>
  </StrictMode>,
)
