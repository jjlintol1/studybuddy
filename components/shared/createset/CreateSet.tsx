'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const CreateSet = () => {
  const [notes, setNotes] = useState<string>('');

  return (
    <Tabs defaultValue="paste" className="w-full flex flex-col justify-center">
      <TabsList>
        <TabsTrigger value="paste" className="focus:border-2 w-96">
          Paste Notes
        </TabsTrigger>
        <TabsTrigger value="file" className="focus:border-2 w-96">
          Add a File
        </TabsTrigger>
      </TabsList>
      <TabsContent value="paste">
        <Card className="py-5 mb-6 text-center">Paste your notes here</Card>
        <Textarea
          placeholder="Paste here"
          rows={20}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
      </TabsContent>
      <TabsContent value="file">
        <Card className="py-5 mb-6 text-center">Attach a file</Card>
        <Input type="file" />
      </TabsContent>
      <Button
        variant={'outline'}
        className="mt-6 border-2 border-black hover:border-primary-500 self-center w-[300px]"
      >
        Upload
      </Button>
    </Tabs>
  );
};

export default CreateSet;
