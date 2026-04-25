# for Spaces (Hugging Face)
# port mapping is automatic

import os
import sys

# Add parent to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.server import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)