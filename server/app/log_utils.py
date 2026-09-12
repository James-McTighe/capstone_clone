import logging


class ColoredFormatter(logging.Formatter):
    """
    Custom logging formatter that adds ANSI color codes based on log levels.
    
    Attributes:
        grey (str): ANSI escape sequence for grey text styling.
        blue (str): ANSI escape sequence for blue text styling.
        yellow (str): ANSI escape sequence for yellow text styling.
        red (str): ANSI escape sequence for red text styling.
        bold_red (str): ANSI escape sequence for bold red text styling.
        reset (str): ANSI escape sequence to reset formatting.
    """
    
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
            logging.DEBUG: f"{self.grey}{self.log_format}{self.reset}",
            logging.INFO: f"{self.blue}{self.log_format}{self.reset}",
            logging.WARNING: f"{self.yellow}{self.log_format}{self.reset}",
            logging.ERROR: f"{self.red}{self.log_format}{self.reset}",
            logging.CRITICAL: f"{self.bold_red}{self.log_format}{self.reset}"
        }

    def format(self, record):
        """
        Formats a log record using the appropriate color for its level.

        Args:
            record (LogRecord): The log message to be formatted.
        
        Returns:
            str: The formatted log message with added ANSI color codes based on the log level.
        """
        log_fmt = self.FORMATS.get(record.levelno, self.log_format)
        return logging.Formatter(log_fmt, datefmt="%Y-%m-%d %H:%M:%S").format(record)


