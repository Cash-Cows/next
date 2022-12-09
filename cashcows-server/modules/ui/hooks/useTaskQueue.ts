//types
import type { QueueState, TaskState } from '../types';
//hooks
import { useState, useEffect, useCallback } from 'react';

export default function useTaskQueue(): TaskState {
  const purged = { running: false, tasks: [] };
  const [ queue, setQueue ] = useState<QueueState>(purged)

  useEffect(() => {
    if (queue.tasks.length === 0 || queue.running) {
      return;
    }

    const task = queue.tasks[0];
    setQueue((prev) => ({ running: true, tasks: prev.tasks.slice(1) }));

    Promise.resolve(task()).finally(() => setQueue((prev) => ({ 
      running: false, 
      tasks: prev.tasks 
    })));
  }, [ queue ])

  return {
    tasks: queue.tasks,
    running: queue.running,
    purge: useCallback(() => {
      setQueue(() => purged);
    }, []),
    queue: useCallback(task => {
      setQueue(prev => ({
        running: prev.running,
        tasks: [...prev.tasks, task],
      }));
    }, [])
  };
};