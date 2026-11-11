param(
    [Parameter(Mandatory)][string]$Title,
    [Parameter(Mandatory)][string]$Message
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
if (-not ('SilentNotification' -as [type])) {
    Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
using System.Threading;

public static class SilentNotification
{
    private const uint NIM_ADD = 0;
    private const uint NIM_MODIFY = 1;
    private const uint NIM_DELETE = 2;
    private const uint NIF_ICON = 0x02;
    private const uint NIF_INFO = 0x10;
    private const uint NIIF_INFO = 0x01;
    private const uint NIIF_NOSOUND = 0x10;

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private struct NotifyIconData
    {
        public uint Size;
        public IntPtr Window;
        public uint Id;
        public uint Flags;
        public uint CallbackMessage;
        public IntPtr Icon;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 128)] public string Tip;
        public uint State;
        public uint StateMask;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)] public string Info;
        public uint TimeoutOrVersion;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)] public string InfoTitle;
        public uint InfoFlags;
        public Guid ItemGuid;
        public IntPtr BalloonIcon;
    }

    [DllImport("shell32.dll", CharSet = CharSet.Unicode, ExactSpelling = true)]
    private static extern bool Shell_NotifyIconW(uint command, ref NotifyIconData data);

    public static void Show(IntPtr window, IntPtr icon, string title, string message)
    {
        var data = new NotifyIconData {
            Size = (uint)Marshal.SizeOf(typeof(NotifyIconData)),
            Window = window,
            Id = 1,
            Flags = NIF_ICON,
            Icon = icon,
            InfoTitle = title,
            Info = message,
            InfoFlags = NIIF_INFO | NIIF_NOSOUND,
            TimeoutOrVersion = 2500
        };
        // The taskbar may be unavailable in non-interactive sessions.
        if (!Shell_NotifyIconW(NIM_ADD, ref data))
            return;

        try
        {
            data.Flags = NIF_INFO;
            if (!Shell_NotifyIconW(NIM_MODIFY, ref data))
                throw new InvalidOperationException("Could not show the Windows notification.");
            Thread.Sleep(3000);
        }
        finally
        {
            Shell_NotifyIconW(NIM_DELETE, ref data);
        }
    }
}
'@
}

$window = [System.Windows.Forms.NativeWindow]::new()
$window.CreateHandle([System.Windows.Forms.CreateParams]::new())
try {
    $icon = [System.Drawing.SystemIcons]::Information
    [SilentNotification]::Show($window.Handle, $icon.Handle, $Title, $Message)
} finally {
    $window.DestroyHandle()
}
