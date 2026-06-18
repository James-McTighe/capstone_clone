import logging

class ColoredFormatter(logging.Formatter):
    """Custom logging formatter that adds ANSI color codes based on log levels."""
    
    # ANSI escape sequences for text styling and colors
    grey = "\x1b[38;21m"
    blue = "\x1b[38;5;39m"
    yellow = "\x1b[38;5;226m"
    red = "\x1b[38;5;196m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    
    # Define the log string format
    log_format = "[%(asctime)s] %(levelname)-8s in %(module)s: %(message)s"

    def __init__(self):
        super().__init__()
        # Map log levels to specific colored string formats
        self.FORMATS = {
            logging.DEBUG: self.grey + self.log_format + self.reset,
            logging.INFO: self.blue + self.log_format + self.reset,
            logging.WARNING: self.yellow + self.log_format + self.reset,
            logging.ERROR: self.red + self.log_format + self.reset,
            logging.CRITICAL: self.bold_red + self.log_format + self.reset
        }

    def format(self, record):
        # Fetch the format corresponding to the record's log level
        log_fmt = self.FORMATS.get(record.levelno, self.log_format)
        formatter = logging.Formatter(log_fmt, datefmt="%Y-%m-%d %H:%M:%S")
        return formatter.format(record)
