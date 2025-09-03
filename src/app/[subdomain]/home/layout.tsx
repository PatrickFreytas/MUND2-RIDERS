export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Header Público</header>
          <main>{children}</main>
        <footer>Footer Público</footer>
      </body>
    </html>
  );
}