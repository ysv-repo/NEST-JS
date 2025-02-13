export const ALL_USERS = 'SELECT * FROM user order by id desc;';

export const GET_USER_BY_ID = 'SELECT * FROM user WHERE id = ?;';

export const GET_USERS_BY_IDS = 'SELECT * FROM user WHERE id IN (?) order by id desc;';

export const PROCEDURE_WITHOUT_PARAMETERS = 'CALL csm.test_procedure();';

export const PROCEDURE_WITH_PARAMETERS = 'CALL csm.test_procedure1(?);';
