import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import transactionValidation from '../validations/transaction.validation';
import {
  createTransactionHandler,
  getTransactionsHandler,
  getTransactionByIdHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getTransactionStatsHandler
} from '../controllers/transaction.controller';

const router = express.Router();

router.use(authenticate);

router
  .route('/')
  .post(validate(transactionValidation.createTransaction), createTransactionHandler)
  .get(validate(transactionValidation.getTransactions), getTransactionsHandler);

router
  .route('/stats')
  .get(validate(transactionValidation.getTransactionStats), getTransactionStatsHandler);

router
  .route('/:id')
  .get(validate(transactionValidation.getTransactionById), getTransactionByIdHandler)
  .put(validate(transactionValidation.updateTransaction), updateTransactionHandler)
  .delete(validate(transactionValidation.deleteTransaction), deleteTransactionHandler);

export default router;

