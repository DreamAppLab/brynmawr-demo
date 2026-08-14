import './brynmawr/styles.css'

export const metadata = {
  title: 'Bryn Mawr Ocean Resort — Reserve Your Site',
  description: 'Book your oceanfront RV site at Bryn Mawr Ocean Resort, St. Augustine Beach, FL.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0d1f2d' }}>
        {children}
      </body>
    </html>
  )
}
