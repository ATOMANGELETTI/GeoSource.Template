import MainWindowLayout from "@/app/mainWindow/layout";
import MainWindowContent from "@/app/mainWindow/window/window";

/**
 * Root page — renders the main application window.
 * Composed of the MainWindow layout (titlebar + content area)
 * and the main window content.
 */
export default function Home() {
  return (
    <MainWindowLayout>
      <MainWindowContent />
    </MainWindowLayout>
  );
}
