'use client'
import React from 'react';
import { Card, CardBody, Chip, ScrollShadow, Tooltip } from "@nextui-org/react";
import { Check, X } from 'lucide-react';

interface CountryListProps {
  availability: {
    [key: string]: {
      available: boolean;
      lastChecked: string;
    }
  }
  countries: {
    code: string;
    name: string;
    flag: string;
  }[]
}

const CountryList: React.FC<CountryListProps> = ({ availability, countries }) => {
  const formatLastChecked = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className="bg-default-50 dark:bg-default-100">
      <CardBody>
        <ScrollShadow className="max-h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {countries.map((country) => {
              const status = availability[country.code];
              
              return (
                <Tooltip
                  key={country.code}
                  content={
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Last Checked</div>
                      <div className="text-tiny">
                        {status ? formatLastChecked(status.lastChecked) : 'Not checked'}
                      </div>
                    </div>
                  }
                >
                  <Card
                    key={country.code}
                    className="border-1 border-default-200 dark:border-default-100"
                    isPressable
                  >
                    <CardBody className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-default-700 dark:text-default-500 font-medium">
                            {country.name}
                          </span>
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          startContent={
                            status?.available ? (
                              <Check className="text-success" size={16} />
                            ) : (
                              <X className="text-danger" size={16} />
                            )
                          }
                          color={status?.available ? "success" : "danger"}
                          className="min-w-[80px] justify-center"
                        >
                          {status?.available ? "Available" : "Unavailable"}
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                </Tooltip>
              );
            })}
          </div>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};

export default CountryList;