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

/** TODO:
 * 1. Loading and skeleton.
 * 2. loading state for all button.
 * 3. clean budget tracker api
 * 4. update, delete for schedule tracker
 * 5. Weekly schedule tracker.
 * 6. update delete for subject
 * 7. show prev Exam details data
 * 8. *** we have to make everything responsive ***
 * 9. change all lorem to real text
 * 
 * */

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
