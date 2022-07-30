#!/bin/bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo "No .env file found, copied sample.env."
    cp sample.env .env
fi

echo "Setup complete."
echo "To start the API run 'python api/app.py'"
echo ""
echo "Please make sure to run this file as source ('source setup.sh') or activate the venv manually ('source venv/bin/activate')"