import logging

class ColoredFormatter(logging.Formatter):
    # Define standard ANSI terminal escape sequences
    GREY = "\033[90m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD_RED = "\033[1;31m"
    RESET = "\033[0m"

    # Map log levels to their corresponding terminal colors
    LEVEL_COLORS = {
        logging.DEBUG: GREY,
        logging.INFO: GREEN,
        logging.WARNING: YELLOW,
        logging.ERROR: RED,
        logging.CRITICAL: BOLD_RED
    }

    def format(self, record):
        # Fetch the color matching this specific log entry level
        log_color = self.LEVEL_COLORS.get(record.levelno, self.RESET)
        
        # Colorize the string representation of the level itself
        orig_levelname = record.levelname
        record.levelname = f"{log_color}{orig_levelname}{self.RESET}"
        
        # Format the final line using the layout specified in your JSON config
        result = super().format(record)
        
        # Restore original record property so downstream file loggers don't break
        record.levelname = orig_levelname
        return result
