import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useImagePreview } from "@/hooks/useImagePreview";
import { ImageUploadField } from "@/hooks/useImageUploadField";

interface Props {
  title: string;
  description: string;
  image: ReturnType<typeof useImagePreview>;
  busy: boolean;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onSubmit: () => void;
}

export function CreatePostCard({
  title,
  description,
  image,
  busy,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: Props) {
  return (
    <Card className="border-foreground/8 bg-card/60 shadow-sm backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold tracking-tight">
          Nouveau post
        </CardTitle>
        <CardDescription className="text-xs">
          Titre, description et image requis.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="title" className="text-xs font-medium">
            Titre
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ex: Roadmap Q2"
            autoComplete="off"
            className="h-9 text-sm"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="description" className="text-xs font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Détaillez votre contenu..."
            rows={3}
            className="resize-none text-sm"
          />
        </div>

        <ImageUploadField
          id="new-image"
          label="Image"
          preview={image.preview}
          onChange={image.onChange}
        />

        <Button disabled={busy} onClick={onSubmit} className="w-full">
          {busy ? (
            <>
              <Spinner className="mr-2" /> Création…
            </>
          ) : (
            "Créer le post"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
