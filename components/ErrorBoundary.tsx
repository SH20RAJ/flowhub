'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Title, Text, Button } from 'rizzui';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.fallback) {
                return this.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center py-32 px-6 border-2 border-primary/20 rounded-3xl bg-primary/5 animate-in fade-in duration-500">
                    <div className="p-5 rounded-2xl bg-primary/10 mb-6 text-primary ring-8 ring-primary/5">
                        <AlertCircle className="w-12 h-12" />
                    </div>
                    <Title as="h2" className="text-2xl font-black uppercase tracking-widest text-primary mb-2">
                        Something went wrong
                    </Title>
                    <Text className="text-muted-foreground font-medium text-center max-w-sm mb-8">
                        An unexpected error occurred. We have been notified and are looking into it.
                    </Text>
                    <Button
                        size="lg"
                        className="rounded-xl px-10 h-12 font-bold flex gap-2 items-center transition-transform hover:scale-105 shadow-xl shadow-primary/20"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCw className="w-5 h-5" />
                        Reload Page
                    </Button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre className="mt-12 p-6 rounded-xl bg-black/80 text-green-400 text-xs font-mono overflow-auto max-w-2xl w-full border border-green-500/30">
                            {this.state.error.stack}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
