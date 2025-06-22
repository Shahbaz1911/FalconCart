export function Footer() {
  return (
    <footer className="bg-card shadow-inner mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Falcon Cart. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
