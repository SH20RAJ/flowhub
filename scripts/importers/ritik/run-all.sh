#!/bin/bash
# Run all import ranges in parallel
# Each range handles ~625 workflows with 100 concurrency

echo "🚀 Starting all range importers in parallel..."

# Total: 6259 workflows, split into 10 ranges
bun scripts/importers/ritik/range.ts --start=0 --end=625 &
bun scripts/importers/ritik/range.ts --start=625 --end=1250 &
bun scripts/importers/ritik/range.ts --start=1250 --end=1875 &
bun scripts/importers/ritik/range.ts --start=1875 --end=2500 &
bun scripts/importers/ritik/range.ts --start=2500 --end=3125 &
bun scripts/importers/ritik/range.ts --start=3125 --end=3750 &
bun scripts/importers/ritik/range.ts --start=3750 --end=4375 &
bun scripts/importers/ritik/range.ts --start=4375 --end=5000 &
bun scripts/importers/ritik/range.ts --start=5000 --end=5625 &
bun scripts/importers/ritik/range.ts --start=5625 --end=6259 &

echo "✅ All ranges started! Use 'jobs' or 'htop' to monitor."
echo "📁 Check progress in: .ritik-success.txt, .ritik-error.txt, .ritik-skipped.txt"

wait
echo "🎉 All ranges complete!"
