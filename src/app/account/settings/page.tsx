import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
       <div>
         <h1 className="text-3xl font-bold font-headline">Settings</h1>
         <p className="text-muted-foreground">Manage your application preferences.</p>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <ThemeSwitcher />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
