export const SEARACH_JOB_NAME = {
  SEARCH: 'search',
  SEARCH_INDEX: 'search_index',
  SEARCH_DELETE: 'search_delete',
  SEARCH_UPDATE: 'search_update',
  SEARCH_REINDEX: 'search_reindex',
  SEARCH_REBUILD: 'search_rebuild',
  SEARCH_SYNC: 'search_sync',
  SEARCH_SYNC_ALL: 'search_sync_all',
  SEARCH_SYNC_INDEX: 'search_sync_index',
  SEARCH_SYNC_DELETE: 'search_sync_delete',
  SEARCH_SYNC_UPDATE: 'search_sync_update',
} as const;
export const MAIL_JOBS = {
  SEND_MAIL: 'send_mail',
} as const;
export const FILE_JOBS = {
  SEND_FILE: 'send_file',
  UPLOAD_SAC_VID: 'upload_sac_video',
} as const;
export const NOTIFICATION_JOBS = {
  SEND_NOTIFICATION: 'send_notification',
} as const;
