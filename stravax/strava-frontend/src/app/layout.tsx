import './globals.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

export const metadata = {
  title: 'Strava Dashboard',
  description: 'View your Strava activities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  )
}
