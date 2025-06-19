import Dexie from 'dexie';

export const db = new Dexie('todoDB');
db.version(1).stores({
  tasks: '++id, title, description, completed, createdAt'
});

export const backupToFile = async () => {
  const tasks = await db.tasks.toArray();
  const blob = new Blob([JSON.stringify(tasks)], { type: 'application/json' });
  const filename = `待办数据_${new Date().toISOString().slice(0,10).replace(/-/g,'')}.json`;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};