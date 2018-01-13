import { TransactionInfo } from '../containers';

class SortTransactions {
  data: Array<TransactionInfo>;
  
  constructor(data: Array<TransactionInfo>) {
    this.data = data;
  }

  sort(): Array<TransactionInfo> {
    return this.data.sort(this.sortFunction);
  }

  protected sortFunction(a: TransactionInfo, b: TransactionInfo): number {
    throw "implementation required";    
  }
}

class SortValueDesc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if (a.value < b.value) {
      return 1;
    }
    return -1;
  }
}

class SortValueAsc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if (a.value > b.value) {
      return 1;
    }
    return -1;
  }
}

class SortSenderDesc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if(a.sender.localeCompare(b.sender) == -1){
      return -1
    }
    return 1;
  }
}

class SortSenderAsc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if(a.sender.localeCompare(b.sender) != -1){
      return -1;
    }
    return 1;
  }
}

class SortReceiverDesc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if(a.receiver.localeCompare(b.receiver) == -1){
      return -1
    }
    return 1;
  }
}

class SortReceiverAsc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if(a.receiver.localeCompare(b.receiver) != -1){
      return -1;
    }
    return 1;
  }
}

class SortHashDesc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if(a.hash.localeCompare(b.hash) == -1){
      return -1
    }
    return 1;
  }
}

class SortHashAsc extends SortTransactions {
  protected sortFunction(a: TransactionInfo, b: TransactionInfo) {
    if(a.hash.localeCompare(b.hash) != -1){
      return -1;
    }
    return 1;
  }
}

export {
  SortSenderAsc,
  SortSenderDesc,
  SortValueAsc,
  SortValueDesc,
  SortReceiverAsc,
  SortReceiverDesc,
  SortHashAsc,
  SortHashDesc
}