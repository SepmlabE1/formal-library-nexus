
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <Layout title="Settings">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="circulation">Circulation</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Library Information</CardTitle>
              <CardDescription>
                Manage your library's basic information settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="library-name">Library Name</Label>
                <Input id="library-name" defaultValue="Central Community Library" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Library Street, Booktown, BT 12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="contact@centrallibrary.org" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" defaultValue="www.centrallibrary.org" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how the system notifies members about different events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Due Date Reminders</h4>
                  <p className="text-sm text-muted-foreground">Send email reminders before books are due.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Overdue Notifications</h4>
                  <p className="text-sm text-muted-foreground">Notify members when books are overdue.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Hold Notifications</h4>
                  <p className="text-sm text-muted-foreground">Alert members when reserved books are available.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">System Announcements</h4>
                  <p className="text-sm text-muted-foreground">Send notifications about library events and closures.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="circulation">
          <Card>
            <CardHeader>
              <CardTitle>Circulation Settings</CardTitle>
              <CardDescription>
                Configure loan periods, fines, and other circulation policies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-period-books">Standard Loan Period (days)</Label>
                  <Input id="loan-period-books" type="number" defaultValue="14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-renewals">Maximum Renewals</Label>
                  <Input id="max-renewals" type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fine-rate">Daily Fine Rate ($)</Label>
                  <Input id="fine-rate" type="number" step="0.01" defaultValue="0.25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-fine">Maximum Fine ($)</Label>
                  <Input id="max-fine" type="number" step="0.01" defaultValue="10.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace-period">Grace Period (days)</Label>
                  <Input id="grace-period" type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-items">Maximum Items Per Member</Label>
                  <Input id="max-items" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Configure staff access and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Administrator Accounts</h4>
                  <p className="text-sm text-muted-foreground mb-2">Users with full system access</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between items-center">
                      <span>admin@library.org</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>director@library.org</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Staff Accounts</h4>
                  <p className="text-sm text-muted-foreground mb-2">Users with limited system access</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between items-center">
                      <span>librarian1@library.org</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>librarian2@library.org</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>circulation@library.org</span>
                      <Button size="sm" variant="outline">Manage</Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Add User</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Data</CardTitle>
              <CardDescription>
                Configure automatic backups and data retention policies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatic Daily Backup</h4>
                  <p className="text-sm text-muted-foreground">Create a backup of the database daily at midnight.</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-location">Backup Storage Location</Label>
                <Input id="backup-location" defaultValue="/var/backups/library" />
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="mr-2">Manual Backup</Button>
                <Button variant="outline">Restore From Backup</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
