import Vue from 'vue';

interface SnackbarOptions {
    message: string;
    color: string;
    timeout?: number;
}

class SnackbarService {
    public vm: Vue = new Vue();

    constructor() {
        this.vm = new Vue();
    }

    public show(options: SnackbarOptions): void {
        this.vm.$emit('show-snackbar', options);
    }

    public showSuccess(message: string, timeout: number = 4000): void {
        this.show({ message, color: 'success', timeout });
    }

    public showError(message: string, timeout: number = 4000): void {
        this.show({ message, color: 'error', timeout });
    }
}

export const snackbarService = new SnackbarService();
