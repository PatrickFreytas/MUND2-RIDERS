export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header></header>
          <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}