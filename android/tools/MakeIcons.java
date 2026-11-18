import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.LinearGradientPaint;
import java.awt.Paint;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Line2D;
import java.awt.geom.Path2D;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import javax.imageio.ImageIO;

public final class MakeIcons {
    private static final int SS = 4;
    private static final Color ROSE_LIGHT = Color.decode("#fb7185");
    private static final Color ROSE = Color.decode("#be123c");
    private static final Color ROSE_DARK = Color.decode("#7f1034");
    private static final Color GREEN = Color.decode("#22c55e");
    private static final String[] DENSITIES = {"mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"};
    private static final int[] LEGACY_SIZES = {48, 72, 96, 144, 192};
    private static final int[] ADAPTIVE_SIZES = {108, 162, 216, 324, 432};

    public static void main(String[] args) throws Exception {
        File res = new File(args.length > 0 ? args[0] : "res");
        for (int i = 0; i < DENSITIES.length; i++) {
            String folder = "mipmap-" + DENSITIES[i];
            writePng(new File(res, folder + "/ic_launcher.png"), render(LEGACY_SIZES[i], "square"));
            writePng(new File(res, folder + "/ic_launcher_round.png"), render(LEGACY_SIZES[i], "round"));
            writePng(new File(res, folder + "/ic_launcher_foreground.png"), render(ADAPTIVE_SIZES[i], "foreground"));
            writePng(new File(res, folder + "/ic_launcher_background.png"), render(ADAPTIVE_SIZES[i], "background"));
        }
        String adaptiveXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
                + "<adaptive-icon xmlns:android=\"http://schemas.android.com/apk/res/android\">\n"
                + "    <background android:drawable=\"@mipmap/ic_launcher_background\"/>\n"
                + "    <foreground android:drawable=\"@mipmap/ic_launcher_foreground\"/>\n"
                + "</adaptive-icon>\n";
        writeText(new File(res, "mipmap-anydpi-v26/ic_launcher.xml"), adaptiveXml);
        writeText(new File(res, "mipmap-anydpi-v26/ic_launcher_round.xml"), adaptiveXml);
    }

    private static BufferedImage render(int size, String kind) {
        int big = size * SS;
        BufferedImage source = new BufferedImage(big, big, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = source.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);

        if ("foreground".equals(kind)) {
            drawGlyph(g, big, 0.9);
        } else {
            boolean round = "round".equals(kind);
            Shape tile = round
                    ? new Ellipse2D.Double(0, 0, big, big)
                    : new RoundRectangle2D.Double(0, 0, big, big, big * 0.24, big * 0.24);
            Paint gradient = new LinearGradientPaint(
                    0f, 0f, big, big,
                    new float[] {0f, 0.55f, 1f},
                    new Color[] {ROSE_LIGHT, ROSE, ROSE_DARK});
            g.setPaint(gradient);
            g.fill(tile);
            if (!"background".equals(kind)) {
                g.setColor(new Color(255, 255, 255, 70));
                g.setStroke(new BasicStroke((float) (1.5 * big / 48.0)));
                g.draw(tile);
            }
            if (!"background".equals(kind)) {
                drawGlyph(g, big, 1.0);
            }
        }
        g.dispose();

        BufferedImage output = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);
        Graphics2D out = output.createGraphics();
        out.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        out.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        out.drawImage(source, 0, 0, size, size, null);
        out.dispose();
        return output;
    }

    private static void drawGlyph(Graphics2D g, int big, double scaleFactor) {
        double scale = (big / 48.0) * scaleFactor;
        g.translate(big / 2.0 - 26.85 * scale, big / 2.0 - 20.15 * scale);
        g.scale(scale, scale);

        Path2D left = new Path2D.Double();
        left.moveTo(12, 17.5);
        left.curveTo(15.4, 15.7, 18.8, 15.7, 22.5, 17.5);
        left.lineTo(22.5, 33);
        left.curveTo(18.8, 31.2, 15.4, 31.2, 12, 33);
        left.closePath();

        Path2D right = new Path2D.Double();
        right.moveTo(25.5, 17.5);
        right.curveTo(29.2, 15.7, 32.6, 15.7, 36, 17.5);
        right.lineTo(36, 33);
        right.curveTo(32.6, 31.2, 29.2, 31.2, 25.5, 33);
        right.closePath();

        g.setColor(new Color(255, 255, 255, 245));
        g.fill(left);
        g.fill(right);

        g.setColor(new Color(255, 255, 255, 230));
        g.setStroke(new BasicStroke(1.6f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g.draw(new Line2D.Double(24, 17, 24, 33.5));

        g.setColor(GREEN);
        g.fill(new Ellipse2D.Double(35.5 - 6.2, 13.5 - 6.2, 12.4, 12.4));

        Path2D check = new Path2D.Double();
        check.moveTo(32.7, 13.6);
        check.lineTo(34.6, 15.5);
        check.lineTo(38.4, 11.3);
        g.setColor(Color.WHITE);
        g.setStroke(new BasicStroke(2f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g.draw(check);
    }

    private static void writePng(File target, BufferedImage image) throws Exception {
        File parent = target.getParentFile();
        if (parent != null && !parent.exists() && !parent.mkdirs()) {
            throw new IllegalStateException("Cannot create " + parent);
        }
        if (!ImageIO.write(image, "png", target)) {
            throw new IllegalStateException("No PNG writer for " + target);
        }
    }

    private static void writeText(File target, String content) throws Exception {
        File parent = target.getParentFile();
        if (parent != null && !parent.exists() && !parent.mkdirs()) {
            throw new IllegalStateException("Cannot create " + parent);
        }
        try (Writer writer = new OutputStreamWriter(new FileOutputStream(target), StandardCharsets.UTF_8)) {
            writer.write(content);
        }
    }
}
