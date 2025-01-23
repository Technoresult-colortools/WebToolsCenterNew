// components/DashboardBugReports.tsx
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Card, CardBody, Chip, Spinner } from "@nextui-org/react";
import { Bug } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface BugReport {
  id: string;
  toolName: string;
  toolId: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
}

export const DashboardBugReports = () => {
  const { user } = useUser();
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const response = await fetch(`/api/bug-reports?userId=${user?.sub}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bug reports');
        }
        const data = await response.json();
        setBugReports(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching bug reports');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchBugReports();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (bugReports.length === 0) {
    return (
      <div className="p-8 text-center">
        <Bug className="w-12 h-12 text-default-300 mx-auto mb-4" />
        <p className="text-default-500">No bug reports submitted yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
      {bugReports.map((report) => (
        <Card key={report.id} className="bg-content1/50">
          <CardBody>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <Link 
                    href={`/tools/${report.toolId}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {report.toolName}
                  </Link>
                  <span className="text-tiny text-default-500">
                    {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <Chip
                  size="sm"
                  color={
                    report.status === 'resolved' ? 'success' :
                    report.status === 'in-progress' ? 'warning' : 'danger'
                  }
                >
                  {report.status}
                </Chip>
              </div>
              <h4 className="font-medium">{report.subject}</h4>
              <p className="text-default-700 text-sm whitespace-pre-wrap">{report.description}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};