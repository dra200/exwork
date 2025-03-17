import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ContactRequest } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash, Eye, CheckCircle, Clock, Hourglass } from "lucide-react";
import { format } from "date-fns";

export function ContactRequestManager() {
  const { toast } = useToast();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<ContactRequest | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: contactRequests, isLoading } = useQuery<ContactRequest[]>({
    queryKey: ['/api/admin/contact-requests'],
  });

  const handleStatusChange = async (id: number, status: string) => {
    setIsUpdating(true);
    try {
      await apiRequest('PATCH', `/api/admin/contact-requests/${id}/status`, { status });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-requests'] });
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await apiRequest('DELETE', `/api/admin/contact-requests/${deleteId}`, {});
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-requests'] });
      toast({
        title: "Success",
        description: "Contact request deleted successfully",
      });
      setDeleteId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact request",
        variant: "destructive",
      });
    }
  };

  const handleView = (request: ContactRequest) => {
    setCurrentRequest(request);
    setViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="default" className="bg-blue-500">New</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-amber-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'in-progress':
        return <Hourglass className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Contact Requests</h2>
        <p className="text-muted-foreground">Manage incoming contact and service requests</p>
      </div>

      {contactRequests && contactRequests.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.service}</TableCell>
                <TableCell>
                  {request.createdAt instanceof Date 
                    ? format(request.createdAt, 'MMM dd, yyyy') 
                    : format(new Date(request.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="mr-2">
                      {getStatusIcon(request.status)}
                    </div>
                    <Select 
                      defaultValue={request.status}
                      onValueChange={(value) => handleStatusChange(request.id, value)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleView(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setDeleteId(request.id)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the contact request.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground">No contact requests found</p>
          </CardContent>
        </Card>
      )}

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Contact Request Details</DialogTitle>
            <DialogDescription>
              Request from {currentRequest?.name}
            </DialogDescription>
          </DialogHeader>
          
          {currentRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Name</h4>
                  <p>{currentRequest.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p>{currentRequest.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                  <p>{currentRequest.phone || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Service</h4>
                  <p>{currentRequest.service}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Message</h4>
                <div className="p-3 bg-muted rounded-md whitespace-pre-wrap">
                  {currentRequest.message}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date Received</h4>
                  <p>
                    {currentRequest.createdAt instanceof Date 
                      ? format(currentRequest.createdAt, 'PPpp') 
                      : format(new Date(currentRequest.createdAt), 'PPpp')}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <div className="mt-1">
                    {getStatusBadge(currentRequest.status)}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setViewDialogOpen(false)}
            >
              Close
            </Button>
            <Select 
              defaultValue={currentRequest?.status}
              onValueChange={(value) => {
                if (currentRequest) {
                  handleStatusChange(currentRequest.id, value);
                }
              }}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Set as New</SelectItem>
                <SelectItem value="in-progress">Set as In Progress</SelectItem>
                <SelectItem value="completed">Set as Completed</SelectItem>
              </SelectContent>
            </Select>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
